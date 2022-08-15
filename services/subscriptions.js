import { apiAuthRequest } from "utils/request";

export const saveSubscription = (data) =>
  apiAuthRequest({
    method: data.id ? "PATCH" : "POST",
    data,
    url: data.id ? `/subscriptions/${data.id}` : "/subscriptions",
  }).then((subResponse) => {
    const { data: sub } = subResponse.data;

    return {
      id: sub.id,
      ...sub.attributes,
    };
  });

export const getSubscription = (id) =>
  apiAuthRequest.get(`/subscriptions/${id}`).then((subResponse) => {
    const { data: sub } = subResponse.data;

    return {
      id: sub.id,
      ...sub.attributes,
    };
  });

export const getSubscriptions = () =>
  apiAuthRequest.get("/subscriptions").then((subsResponse) => {
    const { data: subs } = subsResponse.data;

    return subs.map((sub) => ({
      id: sub.id,
      ...sub.attributes,
    }));
  });

export const deleteSubscription = (id) =>
  apiAuthRequest.delete(`/subscriptions/${id}`);

export const resendSubscriptionConfirmation = (id) =>
  apiAuthRequest.get(`/subscriptions/${id}/send_confirmation?redirect=false`);
