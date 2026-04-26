import countries from 'world-countries';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const getContriesData = countries.map((country) => {
  return {
    code: country.cca2,
    korName: country.translations.kor?.common || country.name.common,
    engName: country.name.common,
    flagEmoji: country.flag,
    latlng: country.latlng,
    region: country.region,
    currency: country.currencies,
  };
});

getContriesData.sort((a, b) => a.korName.localeCompare(b.korName, 'ko'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const savePath = path.join(__dirname, '../../../public/data/countries_data.json');
fs.writeFileSync(savePath, JSON.stringify(getContriesData, null, 2))
