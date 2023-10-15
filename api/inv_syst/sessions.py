from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker


class ScopedSession:

    def __init__(self, db_engine):
        self.engine = db_engine

    def create_session(self):
        session_factory = sessionmaker(bind=self.engine)
        session = scoped_session(session_factory)
        return session
