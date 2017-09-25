export class PostMock {
  public static wpGet404 = `{
    "code": "rest_post_invalid_id",
    "message": "[404 message here]",
    "data": {
      "status": 404
    }
  }`;

  public static wpGet1 = `{
    "id": 1,
    "date": "2017-09-25T16:41:14",
    "slug": "some-title",

    "title": {
      "rendered": "Some title"
    },
    "excerpt": {
      "rendered": "The excerpt"
    },
    "content": {
      "rendered": "Some content we got here"
    }
  }`;

  public static wpGet2 = `{
    "id": 2,
    "date": "2017-10-01T12:13:23",
    "slug": "second-post",

    "title": {
      "rendered": "Second post"
    },
    "excerpt": {
      "rendered": "Some excerpt"
    },
    "content": {
      "rendered": "Content of the second post"
    }
  }`;

  public static get wpGetBySlug1() {

    return '[' + PostMock.wpGet1 + ']';
  }

  public static get wpIndex() {
    return '[' + PostMock.wpGet1 + ',' + PostMock.wpGet2 + ']';
  }
}