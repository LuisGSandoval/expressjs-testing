const handlers = require("./index");

describe("End points", () => {
  describe("Users", () => {
    describe("GET", () => {
      it("returns json with users data", async () => {
        const axios = {
          get: jest.fn().mockResolvedValue({ data: 1 }),
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        await handlers({ axios }).get({}, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(1);
      });
    });
    describe("POST", () => {
      it("returns body in a json", async () => {
        const axios = {
          post: jest.fn().mockReturnValue({ data: 1 }),
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        const req = {
          body: "hola",
        };

        await handlers({ axios }).post(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.send).toHaveBeenCalledWith(1);
        expect(res.send).toHaveBeenCalledTimes(1);

        expect(axios.post).toHaveBeenCalledTimes(1);

        expect(axios.post.mock.calls).toEqual([
          ["https://jsonplaceholder.typicode.com/users", "hola"],
        ]);
      });
    });
    describe("PUT", () => {
      it(" should return a body and it should make an HTTP request to the given URL plus the ID sent", async () => {
        const axios = {
          put: jest.fn().mockResolvedValue({ data: 1 }),
        };

        const req = {
          body: "body",
          params: {
            id: "21",
          },
        };

        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
        };

        await handlers({ axios }).put(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith(1);
        expect(axios.put).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users/21",
          req.body
        );
      });
    });
    describe("DELETE", () => {
      it(" it should return a 204 status", async () => {
        const axios = {
          delete: jest.fn(),
        };
        const req = { params: { id: 21 } };
        const res = {
          sendStatus: jest.fn(),
        };
        await handlers({ axios }).delete(req, res);
        expect(axios.delete).toHaveBeenCalledWith(
          "https://jsonplaceholder.typicode.com/users/21"
        );
        expect(res.sendStatus).toHaveBeenCalledWith(204);
      });
    });
  });
});
