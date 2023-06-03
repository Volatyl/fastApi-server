from sqlalchemy import create_engine, Integer, String, Column
from sqlalchemy.orm import sessionmaker, declarative_base

Base = declarative_base()
engine = create_engine('sqlite:///database.db')
Base.metadata.create_all(engine)

class People(Base):
    __tablename__ = 'people'

    id = Column(Integer(), primary_key=True)
    name = Column(String())
    occupation = Column(String())

    def __repr__(self):
        return f'Name: {self.name}, Occupation: {self.occupation}'
