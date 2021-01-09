import http from '@/utils/http';
export default {
  getSearching(data) {
    return http('/friends/searching', data);
  },
  createApply(data) {
    return http('/friends/apply', data, 'post');
  },
  getSearchingDetail({ id, proposer_id }) {
    return http(`/friends/searching/${id}?proposer_id=${proposer_id}`);
  }
};
