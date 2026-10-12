import os
import pandas as pd  # المكتبة الرسمية الأقوى عالمياً للتحكم بملفات الإكسل

def process_excel_data(file_path):
    """
    قراءة ملف إكسل، تنظيف البيانات من الخلايا الفارغة تلقائياً لمنع الأخطاء (Bugs)،
    وتحويلها إلى مصفوفة جاهزة لإرسالها للواجهة الأمامية أو الفايربيس.
    """
    if not os.path.exists(file_path):
        return {"status": "error", "message": "عذراً، الملف المستهدف غير موجود"}
        
    try:
        # 1. قراءة بيانات ملف الإكسل بالكامل
        df = pd.read_excel(file_path)
        
        # 2. تنظيف الخلايا الفارغة والمفقودة تلقائياً وتبديلها بنصوص فارغة لمنع انهيار التطبيق
        df.fillna("", inplace=True)
        
        # 3. تحويل الجداول إلى صيغة قاموس (JSON Dictionary) لسهولة قراءتها بجافا سكريبت
        cleaned_data = df.to_dict(orient="records")
        
        return {
            "status": "success",
            "total_rows": len(df),
            "data": cleaned_data
        }
        
    except Exception as e:
        return {"status": "error", "message": f"حدث خطأ أثناء معالجة الملف: {str(e)}"}
