export class Post {
  id:       number;
  slug:     string;
  date:     Date;
  title:    string;
  content:  string;
  excerpt:  string;

  constructor (obj: object) {
    for (let prop of ['id', 'slug', 'date', 'title', 'content', 'excerpt']) {
      if (obj[prop]) {
        this[prop] = obj[prop];
      }
    }
  }

};