import multer from 'multer'


export const upload = multer({
    dest: 'upload/'
})


// const upload = multer.single({ storage: storage })

export default upload