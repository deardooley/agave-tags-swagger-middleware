# Agave Tags API Working Draft

This is a simple working draft of the Agave Tags API. Nothing is set is stone
This repository will server as an interation point for further development of the
APIs. You can run a live mock with the Swagger Express Middleware server.

```bash
git clone https://github.com/deardooley/agave-tags-swagger-middleware.git  
cd agave-tags-swagger-middleware  
npm install swagger-express-middleware faker uuid  
node server.js  
```

The server will be available at [http://localhost:8000/tags](http://localhost:8000/tags)

To view and interact with the API documentation, use the hosted [Swagger Editor](http://editor.swagger.io/#/) provided by Reverb and either paste the contents of the `tags.yaml` file into the editor or select File -> Import URL and enter the Swagger Express Middleware URL [http://localhost:8000/api-docs](http://localhost:8000/api-docs)

