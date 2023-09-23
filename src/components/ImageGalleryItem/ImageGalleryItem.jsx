const ImageGalleryItem = ({ images, onClick }) => {
    const {webformatURL, tags, largeImageURL} = images
    return  (
        <li>
            <img src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL)} />
        </li>
    );
};
export default ImageGalleryItem;