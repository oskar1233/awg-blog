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

  public static get wpIndex() {
    return '[' + PostMock.wpGet1 + ',' + PostMock.wpGet2 + ']';
  }
}