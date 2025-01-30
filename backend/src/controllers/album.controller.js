import {albumsModel} from '../models/album.model.js'

export const getAlbums = async (req, res) =>{
    try {
        const albums = await albumsModel.find({})
        return res.status(200).json({ data : albums, success : true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success : false, error });
    }
}

export const getAlbumById = async (req, res) =>{
    try {
        const {id} = req.params
        const album = await albumsModel.findById(id).populate('songs')
        if(!album) return res.status(404).json({ message: 'Album not found', success : false });
        return res.status(200).json({ data : album, success : true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', success : false, error });
    }
}