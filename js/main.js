import {init, getFilteredPictures} from './filters.js';
import './form.js';
import {getData} from './api.js';
import {renderSimilarList} from './rendering.js';
import './fullsize.js';
import {showAlert, debounce} from './util.js';


try {
  const data = await getData();
  const debounceRenderSimilarList = debounce(renderSimilarList);
  init(data, debounceRenderSimilarList);
  renderSimilarList(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
