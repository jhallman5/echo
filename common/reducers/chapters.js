import {
  CREATE_OR_UPDATE_CHAPTER_REQUEST,
  CREATE_OR_UPDATE_CHAPTER_SUCCESS,
  CREATE_OR_UPDATE_CHAPTER_FAILURE
} from '../actions/createOrUpdateChapter'
import {
  LOAD_CHAPTER_REQUEST,
  LOAD_CHAPTER_SUCCESS,
  LOAD_CHAPTER_FAILURE,
} from '../actions/loadChapter'
import {
  LOAD_CHAPTERS_REQUEST,
  LOAD_CHAPTERS_SUCCESS,
  LOAD_CHAPTERS_FAILURE,
} from '../actions/loadChapters'

const initialState = {
  chapters: {},
  isBusy: false,
}

export function chapters(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHAPTER_REQUEST:
    case LOAD_CHAPTERS_REQUEST:
    case CREATE_OR_UPDATE_CHAPTER_REQUEST:
      return Object.assign({}, state, {
        isBusy: true,
      })
    case LOAD_CHAPTER_SUCCESS:
    case LOAD_CHAPTERS_SUCCESS:
    case CREATE_OR_UPDATE_CHAPTER_SUCCESS:
      {
        const chapters = Object.assign({}, state.chapters, action.response.entities.chapters)
        return Object.assign({}, state, {
          isBusy: false,
          chapters,
        })
      }
    case LOAD_CHAPTER_FAILURE:
    case LOAD_CHAPTERS_FAILURE:
    case CREATE_OR_UPDATE_CHAPTER_FAILURE:
      return Object.assign({}, state, {
        isBusy: false,
      })
    default:
      return state
  }
}
