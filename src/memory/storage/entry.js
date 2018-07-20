class Entry {
  constructor() {
    this.entries = {};
  }

  insert(entry) {
    this.entries[entry.id] = entry;
    return this.entries[entry.id];
  }

  findAll() {
    return Object.values(this.entries);
  }

  findOne(id) {
    if (Object.prototype.hasOwnProperty.call(this.entries, id)) {
      return this.entries[id];
    }
    return null;
  }

  update(id, entry) {
    this.entries[id] = entry;
    return this.entries[id];
  }
<<<<<<< HEAD

  delete(id) {
    delete this.entries[id];
    return this.entries[id];
  }
=======
>>>>>>> Revert "Revert "Merge all changes from Develop into Master""
}

module.exports = Entry;
