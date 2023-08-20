export class ImageFileForHttpFormEncapsulation {
    private readonly imageFilePropertyName : string = "imageFile"
    private formData : FormData = new FormData();

    constructor(selectedFile: File){
        this.formData.append(this.imageFilePropertyName, selectedFile)
    }

    getImageFileHttpForm() : FormData {
        return this.formData;
    }

}