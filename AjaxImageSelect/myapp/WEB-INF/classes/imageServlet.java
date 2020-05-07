import java.io.*;
import javax.servlet.http.*;
import javax.servlet.*;
import java.util.ArrayList;

public class imageServlet extends HttpServlet {
    public void doGet (HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException
    {
	
	HttpSession session = req.getSession(true);
	PrintWriter out = res.getWriter();
	
	File imagePath = new File(getServletContext().getRealPath("/image"));
	File[] imageFiles = imagePath.listFiles();
	
	ArrayList<String> im_list = new ArrayList<String>();
		
	int random = (int)(Math.random() * 3);
	String numImg = req.getParameter("numImages");
	int nImg = 0;
	String imageName = "";
	
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

	if(session.isNew()){
		for(int i=0; i < nImg; i++){
			im_list.add(imageFiles[i].getName());
		}
	}else{
		im_list = (ArrayList<String>) session.getAttribute("im_list");
		if(im_list.size() == 0){
			return;
		}
	}
	try{
	imageName = im_list.get(random);
	session.setAttribute("im_list", im_list);
	out.println(imageName);
	im_list.remove(imageName);
	out.close();
	}catch (IndexOutOfBoundsException e){
		imageName = im_list.get(im_list.size() - 1);
		out.println(imageName);

	}

    }
}
