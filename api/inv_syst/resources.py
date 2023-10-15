from falcon_autocrud.resource import CollectionResource, SingleResource
from inv_syst.model import *
import falcon
import json


class EmployeeCollectionResource(CollectionResource):
    model = Employee


class EmployeeResource(SingleResource):
    model = Employee


class InventoryCollectionResource(CollectionResource):
    model = Inventory


class InventoryResource(SingleResource):
    model = Inventory


class TransactionCollectionResource(CollectionResource):
    model = Transaction


class TransactionResource(SingleResource):
    model = Transaction


class TransactionDetailCollectionResource(CollectionResource):
    model = TransactionDetail


class TransactionDetailResource(SingleResource):
    model = TransactionDetail


class SupplierCollectionResource(CollectionResource):
    model = Supplier


class SupplierResource(SingleResource):
    model = Supplier


class InsertTransactionDetails(object):

    def on_post(self, req, resp):
        request = json.loads(req.bounded_stream.read().decode())

        self.session.bulk_insert_mappings(TransactionDetail, request['transaction_details'])
        self.session.bulk_update_mappings(Inventory, request['new_inventory'])
        self.session.commit()

        resp.body = json.dumps(request, ensure_ascii=False)
        resp.status = falcon.HTTP_201


class HealthCheck(object):

    def on_get(self, req, resp):

        status = {
            'API Accessible': True
        }

        resp.body = json.dumps(status, ensure_ascii=False)
        resp.status = falcon.HTTP_200
