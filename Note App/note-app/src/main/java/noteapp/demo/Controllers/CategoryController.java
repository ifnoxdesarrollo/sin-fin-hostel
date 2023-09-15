package noteapp.demo.Controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import noteapp.demo.Entities.Category;
import noteapp.demo.Entities.Note;
import noteapp.demo.Services.CategoryService;

import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,
        RequestMethod.PUT, RequestMethod.OPTIONS })
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id) {
        try {
            Category category = categoryService.getById(id);
            return new ResponseEntity<Category>(category, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAll() {
        try {
            List<Category> categories = categoryService.getAll();
            return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<List<Category>>(Collections.emptyList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/categories/note/{id}")
    public ResponseEntity<List<Category>> getAllNoteCategories(@PathVariable Long id) {
        try {
            List<Category> categories = categoryService.getAllNoteCategories(id);
            return new ResponseEntity<List<Category>>(categories, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<List<Category>>(Collections.emptyList(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        try {
            Category newCategory = categoryService.createCategory(category);
            return new ResponseEntity<Category>(newCategory, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/categories/edit/{id}")
    public ResponseEntity<Category> editCategory(@RequestBody Category category, @PathVariable Long id) {
        try {
            Category editCategory = categoryService.editCategory(category, id);
            return new ResponseEntity<Category>(editCategory, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/categories/delete/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/categories/notes/{id}")
    public ResponseEntity<HttpStatus> addNote(@RequestBody Note note, @PathVariable Long id) {
        try {
            categoryService.setNote(note, id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
