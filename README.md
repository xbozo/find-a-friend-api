# Find a Friend API

Aplicação para visualizar animais p/ adoção.

🚧 - Em progresso
✔️ - Concluído

## Requisitos funcionais

- ✔️ Deve ser possível cadastrar um pet
- ✔️ Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- ✔️ Deve ser possível filtrar pets por suas características
- ✔️ Deve ser possível visualizar detalhes de um pet para adoção
- ✔️ Deve ser possível se cadastrar como uma ORG
- ✔️ Deve ser possível realizar login como uma ORG

## Regras de negócio

- ✔️ Para listar os pets, obrigatoriamente precisamos informar a cidade
- ✔️ Uma ORG precisa ter um endereço e um número de WhatsApp
- ✔️ Um pet deve estar ligado a uma ORG
- ✔️ O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- ✔️ Todos os filtros, além da cidade, são opcionais
- ✔️ Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Setup

```
npm install
npm run docker:start
npm run dev

// Tests
npm run test
npm run test:e2e
```

## Endpoints

- **GET** /pets/:id
- **GET** /pets
  - Queries >
    - _city_ (not optional)
    - _energyLevel_ (1-3)
    - _independencyLevel_ (1-3)
    - _animalSize_ (1-3)
    - _ageInMonths_ (returns GTE)
    - _animal_ (e.g "Cachorro")
- **POST** /orgs

```json
{
	"name": "Example org name",
	"email": "contact@example.com",
	"password": "123456",
	"address": "Rua Maria das Raposas N° 80, Teresina/SP",
	"phoneNumber": "12997931931"
}
```

- **POST** /sessions - authenticate as org

```json
{
	"email": "contact@example.com",
	"password": "123456"
}
```

- **POST** /pets - must be authenticated

```json
{
	"name": "Marquinhos",
	"city": "Maria das Cruzes/SP",
	"ageInMonths": 38,
	"energyLevel": 3,
	"independencyLevel": 3,
	"animalSize": 2,
	"animal": "Cachorro",
	"requirements": ["Ambiente amplo e plano", "Cuidados extras com os pelos"]
}
```

- **PATCH** /token/refresh
