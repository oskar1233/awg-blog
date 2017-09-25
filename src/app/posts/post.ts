export class Post {
  id:       number;
  title:    string;
  content:  string;
  excerpt:  string;

  constructor (obj: object) {
    for (let prop of ['id', 'title', 'content', 'excerpt']) {
      if (obj[prop]) {
        this[prop] = obj[prop];
      }
    }
  }

};