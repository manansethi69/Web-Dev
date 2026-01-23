import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
public class ViewResumeController {
    private final ResumeService resumeService;

    @Autowired
    public ViewResumeController(ResumeService resumeService) {
    this.resumeService = resumeService;
}

@GetMapping("/getresume/{role}")
public ResponseEntity<List<Resume>> getResumeByRole(@PathVariable String role) {
    List<Resume> resumes = resumeService.getResumeByRole(role);
    if (resumes.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(resumes, HttpStatus.OK);
}

@GetMapping("/getqualifications/{role}")
public ResponseEntity<List<String>> getQualificationsByRole(@PathVariable String role) {
    List<String> qualifications = resumeService.getQualificationsByRole(role);
    if (qualifications.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(qualifications, HttpStatus.OK);
}

@GetMapping("/getworkexperience/{role}")
public ResponseEntity<List<String>> getWorkExperienceByRole(@PathVariable String role) {
    List<String> workExperience = resumeService.getWorkExperienceByRole(role);
    if (workExperience.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(workExperience, HttpStatus.OK);
}
}
