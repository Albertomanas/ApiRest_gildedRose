from flask_restful import Resource, Api
# from repository.models import Item
from services.service_resuelto import Service


class Quality(Resource):

    # /items/quality/<itemQuality>
    def get(self, itemQuality):
        return Service.filterQuality(itemQuality)
