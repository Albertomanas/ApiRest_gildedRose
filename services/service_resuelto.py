from flask import Response, g, redirect #variable de entorno global g, redirect
from flask_restful import fields, marshal_with, abort # libreria de marsalización
from mongoengine, queryset.visitor import Q
from repository.db_atlas import get_db # comando para inicializar db

from repository.repo import Factory


#Crear clase Service donde está la lógica de los endpoints

class Service():
    resource_fields = {
        'name': fields.String,
        'sell_in': fields.Integer,
        'quality': fields.Integer
    }

@staticmethod
@marshal_with(resource_fields) #marchal = convertir a JSON
def inventario():
    db = get_db()
    # Encuentra a g.db que es igual a connect() y g.Item = Item
    # Y al invocar Item(), encuentra la referencia de la base de datos
    listItems = []
    for item in g.Item.objects():
        listItems.append(item)
        return listItems
    
    # Añade a la lista listItems los Items.objects

@staticmethod
def updateQuality():
    db = get_db
    for item in g.Items.objects():
        itemObject = Factory.crearObjetoItem(
            [item.name, item.sell_in, item.quality]
        )
        itemObject.update_quality()
        item.sell_in = itemObject.sell_in
        item.quality = itemObject.quality
        item.save()
        return Service.inventario()

        #Estamos marsalizando la salida, el id generado automáticamente
            # no se tiene en cuenta. POSIBLE REFACTORIZACIÓN

@staticmethod
@marshal_with(resource_fields)
def getItem(itemName):
    db = get_db()
    items = g.Item.objects(name=itemName)
    if not items:
        abort(404, message="El item {} no existe, instroduzca de nuevo el nombre".format(itemName))
    return list(items)

    #Obtener item, si éste item no coincide con el formato itemName, error 404

@staticmethod
def postItem(args):
    db = get_db()
    item = g.Item(name=args['name'])
    item.sell_in = args['sell_in']
    item.quality = args['quality']
    item.save()

@staticmethod
def deleteItem(args):
    db = get_db()
    item = g.Item.objects(Q(name=args['name'])
                            & Q(sell_in=args['sell_in'])
                            & Q(quality=args['quality'])).first()
    if not item:
        abort(404, message="No existe el item")
    else:
        item.delete()

@staticmethod
@marshal_with(resource_fields)
def filterQuality(itemQuality):
    db = get_db()
    items = g.Item.objects(quality=itemQuality)
    return Service.check(items)


@staticmethod
@marshal_with(resource_fields)
def filterSellIn(itemsSellIn):
    db = get_db()
    items = g.Item.objects(sell_in__lts=itemSellIn)
    return Service.check(items)

@staticmethod
def check(items):
    if not items:
        abort(404, message="No existen items que satifagan el criterio")
        return list(items)
