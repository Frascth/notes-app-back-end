const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNote = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = { id, title, tags, body, createdAt, updatedAt};
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    let response = h.response({
        status : "fail",
        message : "Gagal menambahkan catatan",
    });
    response.code(500);

    if (isSuccess) {
        response = h.response({
            status : "success",
            message : "Berhasil menambahkan catatan",
            data : {"id" : id}
        });
        response.code(201);
    }

    return response;
    
}

const getNotes = () => {
    return {status : "success", data : {notes}, message : "Berhasil mendapatkan semua note"};
}

const getNoteById = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((note) => note.id == id)[0];
    let response = h.response({
        status : "fail",
        message : `Gagal tidak ditemukan note dengan id ${id}`
    });
    response.code(404);

    if (note !== undefined) {
        response = h.response({
            status : "success",
            message : `Berhasil mendapatkan note dengan id ${id}`,
            data : {note}
        });
        response.code(200);
    }
    return response;
}

const editNoteById = (request, h) => {
    const { id } = request.params;
    const {title, tags, body} = request.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((note) => note.id === id);

    if (index == -1) {
        let response = h.response({
            status : "failed",
            message : `Gagal tidak ditemukan note dengan id ${id}`
        });
        response.code(404);
        return response;
    }

    notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt
    }

    let response = h.response({
        status : "success",
        message : `Berhasil mengubah note dengan id ${id}`
    });
    response.code(200);

    return response;

}

const deleteNoteById = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);

    if (index == -1) {
        let response = h.response({
            status : "failed",
            message : `Gagal menghapus note dengan id ${id}`
        });
        response.code(404);

        return response;
    }

    notes.splice(index, 1);
    let response = h.response({
        status : "success",
        message : `Berhasil menghapus note dengan id ${id}`
    });
    response.code(200);

    return response;
}

module.exports = { addNote, getNotes, getNoteById, editNoteById, deleteNoteById }