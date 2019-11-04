from ..repository import Repository
from ..repository.mongo import MongoRepository
from .schema import KudoSchema


class Service(object):
    def __init__(self, user_id, repo_client=Repository(adapter=MongoRepository)):
        self.repo_client = repo_client
        self.user_id = user_id

        if not user_id:
            raise Exception("user id not provided")
