from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import sessionmaker
from model import People, engine

Session = sessionmaker(bind=engine)
session = Session()

app = FastAPI()


class User(BaseModel):
    name: str
    occupation: str


app.add_middleware(
    CORSMiddleware,
    # Replace "*" with the specific origins you want to allow
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get('/people', tags=['Home'])
def get_people():
    with session as s:
        people = s.query(People).all()
    return people


@app.get('/people/{person_id}', tags=['Tasks'])
def get_person(person_id: int):
    with session as s:
        person = s.query(People).filter_by(id=person_id).first()
        if person:
            return person
        return {'message': 'Person not found'}


@app.post('/people/add', tags=['Tasks'])
def add_person(user: User):
    with session as s:
        person = People(name=user.name, occupation=user.occupation)
        s.add(person)
        s.commit()
    return {'Person added successfully'}


@app.put('/people/{person_id}', tags=['Tasks'])
def update_person(person_id: int, user: User):
    with session as s:
        person = s.query(People).filter_by(id=person_id).first()
        if user.name == 'string':
            k = person.name
        else:
            k = user.name

        if user.occupation == 'string':
            x = person.occupation
        else:
            x = user.occupation

        person.name = k
        person.occupation = x
        s.commit()
    return 'update successful'


@app.delete('/people/{person_id}', tags=['Tasks'])
def delete_person(person_id: int):
    with session as s:
        session.query(People).filter_by(id=person_id).delete()
        session.commit()
        return ' Delete successful'
