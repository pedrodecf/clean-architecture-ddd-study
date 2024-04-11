import { Slug } from './slug'

test('it should be able to create a slug from a string', () => {
  const slug = Slug.createFromText('Hello World')
  expect(slug.value).toEqual('hello-world')
})
