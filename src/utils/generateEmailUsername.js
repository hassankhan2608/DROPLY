import { faker } from '@faker-js/faker';
import { mysticalCreatures, superheroes, godsOfWar, animeCharacters, villains, marvelCharacters, quantumTerms, dcCharacters } from '../lib/customDictionaries';

export function generateEmailUsername() {
  const types = [
    () => `${faker.helpers.arrayElement(mysticalCreatures)}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.helpers.arrayElement(superheroes)}-${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.helpers.arrayElement(godsOfWar)}-${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.helpers.arrayElement(animeCharacters)}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.helpers.arrayElement(villains)}-${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.helpers.arrayElement(marvelCharacters)}-${faker.number.int({ min: 1000, max: 9999 })}`,
    () => `${faker.helpers.arrayElement(dcCharacters)}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.helpers.arrayElement(quantumTerms)}-${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.internet.userName()}${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.color.human()}-${faker.commerce.product()}${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.internet.domainWord()}-${faker.number.int({ min: 1000, max: 9999 })}`,
    () => `${faker.vehicle.manufacturer()}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.science.chemicalElement().name}-${faker.number.int({ min: 10, max: 99 })}`,
    () => `${faker.music.genre()}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.animal.type()}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.person.jobTitle().replace(/\s+/g, '')}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.address.cityName()}-${faker.number.int({ min: 100, max: 999 })}`,
    () => `${faker.word.adjective()}-${faker.word.noun()}${faker.number.int({ min: 100, max: 999 })}`,
  ];

  const generator = faker.helpers.arrayElement(types);
  return generator().toLowerCase().replace(/[^a-z0-9-]/g, '');
}
