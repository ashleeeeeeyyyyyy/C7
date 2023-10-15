class SQLAlchemySessionManager:
    """
    Create a scoped session for every request and close it when the request
    ends.
    """

    def __init__(self, sessions):
        self.sessions = sessions

    def process_resource(self, req, resp, resource, params):
        resource.session = self.sessions()

    def process_response(self, req, resp, resource, req_succeeded):
        if hasattr(resource, 'session'):
            self.sessions.remove()
