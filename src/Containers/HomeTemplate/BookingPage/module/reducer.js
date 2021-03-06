let initialState = {
  danhSachVe: [],
};

const bookingTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "THEM_DANH_SACH_VE":
      const ghe = action.payload;
      let dsVe = [...state.danhSachVe];
      if (dsVe.length > 0) {
        const index = dsVe.findIndex((i) => {
          return i.maGhe === ghe.maGhe;
        });
        if (index === -1) {
          dsVe = [
            ...state.danhSachVe,
            {
              maGhe: ghe?.maGhe,
              giaVe: ghe?.giaVe,
              tenGhe: ghe?.tenGhe,
            },
          ];
        } else {
          dsVe.splice(index, 1);
        }
      } else {
        dsVe = [
          ...state.danhSachVe,
          {
            maGhe: ghe?.maGhe,
            giaVe: ghe?.giaVe,
            tenGhe: ghe?.tenGhe,
          },
        ];
      }
      state.danhSachVe = dsVe;
      return { ...state };
    case "XOA_DANH_SACH_VE":
      let ds = [];
      state.danhSachVe = ds;
      return { ...state };
    default:
      return { ...state };
  }
};

export default bookingTicketReducer;
