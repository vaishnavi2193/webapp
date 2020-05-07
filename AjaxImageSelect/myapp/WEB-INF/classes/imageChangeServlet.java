import java.io.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.util.ArrayList;
import java.util.*;

public class imageChangeServlet extends HttpServlet {
    public void doGet (HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {
	PrintWriter out = res.getWriter();
	
	File imagePath = new File(getServletContext().getRealPath("/image"));
	File[] imageFiles = imagePath.listFiles();
	int random = (int)(Math.random() * 3);
	String imagename = "";
	String numImg = req.getParameter("numImages");
	int nImg = 0;
	if(numImg == null){
		nImg = imageFiles.length;
	}else {
		nImg = Integer.parseInt(numImg);
	}
	
	if(nImg >= imageFiles.length){
		nImg = imageFiles.length;
	}

	if(nImg == 0){
		return;
	}

	for(int i=0; i < nImg; i++){
		imagename = imagename + imageFiles[i].getName() + ",";
	}
	out.println(imagename);
	out.close();

    }
}
