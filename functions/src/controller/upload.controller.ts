import * as httpStatus from "http-status"
const catchAsync = require('../utils/catchAsync');

const uploadInS3 = catchAsync(async (req: any, res: any) => {
    console.log('Req in console', req)
    const image = req.files[0];
   

    res.status(httpStatus.OK).send({
        success: true,
        data: { imageUrl: image.location },
        message: 'Image Successfully uploaded',
    });
});

export {
    uploadInS3
}