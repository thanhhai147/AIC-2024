import streamlit as st
import pandas as pd
from io import StringIO, BytesIO

# Hàm create_bin
def create_bin(dir, start, end, qa, k):
    bin = (end - start) / k
    a = []
    for i in range(1, k + 1):
        if qa is None:
            result = f'{dir}, {int(bin) * i}'
        else:
            result = f'{dir}, {int(bin) * i}, {qa}'

        a.append(result)
    return a
st.title("Bin Creation Tool - Export to CSV")

# Nhập vào các giá trị từ người dùng
dir = st.text_input("Enter Directory:", value='L01')
start = st.number_input("Enter Start Value:", min_value=0, value=1000)
end = st.number_input("Enter End Value:", min_value=0, value=100000)
qa = st.text_input("Enter QA (optional):", value=None)
k = st.number_input("Enter K value (number of bins):", min_value=1, value=95)

# Khi người dùng nhấn nút, tính toán và tạo file CSV
if st.button("Create Bin and Download CSV"):
    result = create_bin(dir, start, end, qa, k)
    
    # Chuyển danh sách thành DataFrame
    df = pd.DataFrame(result)
    
    # Tạo file CSV trong bộ nhớ
    csv_buffer = StringIO()
    df.to_csv(csv_buffer, header=False, index=False)
    
    # Chuyển đổi nội dung StringIO thành bytes
    bytes_data = BytesIO(csv_buffer.getvalue().encode('utf-8'))
    
    # Tạo liên kết để tải file CSV
    st.download_button(label="Download CSV",
                       data=bytes_data,
                       file_name="bins_output.csv",
                       mime="text/csv")