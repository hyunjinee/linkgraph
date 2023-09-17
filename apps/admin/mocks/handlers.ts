import { rest } from 'msw';

export const handlers = [
  rest.get('/todos', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        todos: [
          { id: 1, title: 'todo1', completed: false },
          { id: 2, title: 'todo2', completed: true },
        ],
      }),
    );
  }),
];
