import axios from "axios";

export default axios.create({
  baseURL: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=943b55067047b1a156e92ca1cc6fbe93&user_id=192820496@N05&format=json&nojsoncallback=?&per_page=100&extras=date_taken,url_m,url_l"
});