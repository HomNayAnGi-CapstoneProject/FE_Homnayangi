// ** Vietnamese có dấu, có khoảng cách ở giữa các ký tự, không ký tự đặc biệt, không số
export const ReGex_VietnameseTitle = /^([0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ]+)(((\s*)[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀẾỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ]*){1,})$/

// ** chỉ chứa ký tự trong bảng chữ cái tiếng anh
export const ReGex_Title = /^[A-Za-z]*$/

// ** số numeric
export const ReGex_Numeric = /^[0-9]*$/

// ** password
export const Regex_Password = /^[A-Za-z0-9]*$/

// ** phone number
export const Regex_PhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/

// ** get guid
export const Regex_GetGuid = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/g
