/* eslint no-underscore-dangle: 0 */
import EntryHandler from '../handler/entryHandler';

class EntryController {
  constructor() {
    this._entry = new EntryHandler();
  }

  create(req, res) {
    const result = this._entry.addEntry(req.body.title, req.body.content);
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  getAll(req, res) {
    const result = this._entry.getAllEntry();
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  getById(req, res) {
    // using obj destructring
    const { id } = req.params;
    const result = this._entry.findEntry(id);
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }

  update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const result = this._entry.updateEntry(id, body);
    res.status(200)
      .json({
        status: 'success',
        data: result,
      });
  }
}

module.exports = EntryController;
