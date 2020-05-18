import Venturi from "../src/venturi";

const input = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

it("small to big", () => {
  const venturi = new Venturi(5);

  let output = [];

  venturi.listen((chunk) => {
    output = [...output, ...Array.from(chunk)];
  });

  venturi.push(input.slice(0, 2));
  venturi.push(input.slice(2, 4));
  venturi.push(input.slice(4, 6));
  venturi.push(input.slice(6, 8));
  venturi.push(input.slice(8, 10));

  expect(input).toEqual(new Uint8Array(output));
});

it("big to small", () => {
  const venturi = new Venturi(2);

  let output = [];

  venturi.listen((chunk) => {
    output = [...output, ...Array.from(chunk)];
  });

  venturi.push(input.slice(0, 5));
  venturi.push(input.slice(5, 10));

  expect(input).toEqual(new Uint8Array(output));
});

it("next", () => {
  const venturi = new Venturi(5);

  let output = [];

  venturi.nextChunk((chunk) => {
    output = [...output, ...Array.from(chunk)];
  });

  venturi.nextChunk((chunk) => {
    output = [...output, ...Array.from(chunk)];
  });

  venturi.push(input.slice(0, 2));
  venturi.push(input.slice(2, 4));
  venturi.push(input.slice(4, 6));
  venturi.push(input.slice(6, 8));
  venturi.push(input.slice(8, 10));

  expect(input).toEqual(new Uint8Array(output));
});
