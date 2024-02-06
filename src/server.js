import {getData} from "./api.js";
import Fastify from 'fastify';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';

const app = Fastify();

app.register(fastifyView, {
    engine: { handlebars },
    templates: 'templates',
    includeViewExtension: true,
    options: {
        partials: {
            header: 'header.hbs',
            footer: 'footer.hbs'
        }
    }
});


app.get('/', async(req,res) => {
    const characters = await getData("https://gateway.marvel.com:443/v1/public/characters?");
    return res.view('index.hbs', { comics : characters });
})
app.listen({ port: 3000 })


