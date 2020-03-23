from flask_restful import Resource, Api
# from repository.models import Item
from services.service_resuelto import Service


class UpdateQuality(Resource):

    def get(self):
        return Service.updateQuality()
