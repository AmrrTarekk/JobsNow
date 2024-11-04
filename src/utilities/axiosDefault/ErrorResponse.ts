export class ErrorResponse {
  code: number;
  message: string;
  data: any;

  constructor() {
    this.code = 0;
    this.message = "";
    this.data = {};
  }

  parseErrorResponse(error: any) {
    const lang = localStorage?.getItem("craft-ln") || "en";

    if (error.response) {
      this.code = error.response.status;
      this.message = error.response.data.error.message;

      this.data = error.response.data?.data || {};
    } else if (error.request) {
      this.message =
        lang === "en"
          ? "Something went wrong with the request"
          : "حدث خطأ ما في الطلب";
      this.code = 500;
      this.data = {};
    } else if (error.message === "canceled") {
      this.code = 500;
      this.message = "canceled";
      this.data = {};
    } else {
      this.code = 500;
      this.message =
        lang === "en"
          ? "Something went wrong!, Error from Server"
          : "حدث خطأ ما! خطأ من الخادم";
      this.data = {};
    }
  }

  getError(error: any) {
    this.parseErrorResponse(error);
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
