--- 
+++ 
@@ -12,10 +12,10 @@
 interface Recipe {
   id: string;
   title: string;
-  ingredients: Array<{
+  ingredients: {
     name: string;
     amount: string;
-  }>;
+  }[];
   instructions: string[];
   imageUrl: string;
 }
