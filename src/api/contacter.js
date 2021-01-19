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
  },
  getApplyCount() {
    return http('/friends/apply/count');
  },
  getApplyList(data) {
    return http('/friends/apply/list', data);
  },
  processAgree(data) {
    return http('/friends/apply/' + data.proposers_id, data, 'put');
  },
  getApplyListDetail(id) {
    return http('/friends/apply/list/' + id);
  }
};
