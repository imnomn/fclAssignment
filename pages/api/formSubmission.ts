import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/client/index';

function generateSerialNumber() {
   const characters = 'asdf123234';
   const serialNumberLength = 8;
 
   let serialNumber = '';
   for (let i = 0; i < serialNumberLength; i++) {
     const randomIndex = Math.floor(Math.random() * characters.length);
     serialNumber += characters.charAt(randomIndex);
   }
 
   return serialNumber;
}
 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { model, licenseLevel, quantity, date } = req.body;

      const result = await prisma.batch.create({
        data: {
          model,
          licenseLevel,
          quantity,
          date,
          serialNumber: generateSerialNumber()
        },
      });

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}