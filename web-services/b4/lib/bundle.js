/**
 * Created by Rossy1 on 2018/12/7.
 */
const rp = require("request-promise");
module.exports = (app, es) => {
    const url = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`;
    app.post("/api/bundle", (req, res) => {
        const bundle = {
            name: req.query.name || "",
            books: []
        }
        rp.post({url, body: bundle, json: true})
            .then(esReqBody => res.status(201).json(esResBody))
            .catch(({error}) => res.status(error.status || 502).json(error))
    })
    app.get("/api/bundle/:id", async (req, res) => {
        const optuions = {
            url: `${url}/${req.params.id}`,
            json: true
        }
        try {
            const esResBody = await rp(optuions);
            res.status(200).json(esResBody)
        } catch (esResRrr) {
            res.status(esResRrr.statusCode || 502).json(esResRrr.error)
        }
    })
    app.put("/api/bundle/:id/name/:name", async (req, res) => {
        const bundleUrl = `${url}/${req.params.id}`;
        try {
            const bundle = (await rp({url: bundleUrl, json: true}))._source;
            bundle.name = req.params.name;
            const esResBody = await rp.put({url: bundleUrl, body: bundle, json: true});
            res.status(200).json(esResBody)
        } catch (esResRrr) {
            res.status(esResRrr.statusCode || 502).json(esResRrr.error)
        }
    })
    app.put("/api/bundle/:id/book/:pgid", async (req, res) => {
        const bundleUrl = `${url}/${req.params.id}`;
        const bookUrl = `http://${es.host}:${es.port}/${es.books_index}/book${req.params.pgid}`;
        try {
            const [bundleRes, bookRes] = await Promise.all([
                rp({url: bundleUrl, json: true}),
                rp({url: bookUrl, json: true})
            ])
            const {_source: bundle, _version: version} = bundleRes;
            const {_source: book} = bookRes;
            const idx = bundle.books.findIndex(book => book.id === req.params.pgid);
            if (idx === -1) {
                bundle.books.push({
                    id: req.params.pgid,
                    title: book, title
                })
            }
            const esResBody = await rp.put({
                url: bundleUrl,
                qs: {version},
                body: bundle,
                json: true
            })
            res.status(200).json(esResBody)
        } catch (esResRrr) {
            res.status(esResRrr.statusCode || 502).json(esResRrr.error)
        }
    })
}