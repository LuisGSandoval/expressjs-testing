const handlers = ({ axios }) => ({
  get: async (req, res) => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    res.status(200).send(data);
  },
  post: async (req, res) => {
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      req.body
    );

    res.status(201).send(data);
  },
  put: async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    try {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        body
      );
      res.status(204);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      res.sendStatus(204);
    } catch (error) {
      res.send({ error });
    }
  },
});

module.exports = handlers;
