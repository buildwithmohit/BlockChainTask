use std::io;

// Custom function to calculate average
fn calculate_average(total_marks: f32, subjects: u32) -> f32 {
    total_marks / subjects as f32
}

// Custom function to assign grade
fn assign_grade(avg: f32) -> char {
    if avg >= 90.0 {
        'A'
    } else if avg >= 75.0 {
        'B'
    } else if avg >= 60.0 {
        'C'
    } else {
        'D'
    }
}

fn main() {
    // Get student name
    println!("Enter student name:");
    let mut name = String::new();
    io::stdin()
        .read_line(&mut name)
        .expect("Failed to read name");
    let name = name.trim();

    // Get total marks
    println!("Enter total marks:");
    let mut marks_input = String::new();
    io::stdin()
        .read_line(&mut marks_input)
        .expect("Failed to read marks");
    let total_marks: f32 = marks_input
        .trim()
        .parse()
        .expect("Please enter a valid number");

    // Get number of subjects
    println!("Enter number of subjects:");
    let mut subjects_input = String::new();
    io::stdin()
        .read_line(&mut subjects_input)
        .expect("Failed to read subjects");
    let num_subjects: u32 = subjects_input
        .trim()
        .parse()
        .expect("Please enter a valid integer");

    // Calculate average and grade
    let average = calculate_average(total_marks, num_subjects);
    let grade = assign_grade(average);

    // Display results
    println!("\n--- Student Report ---");
    println!("Name    : {}", name);
    println!("Average : {:.2}", average);
    println!("Grade   : {}", grade);
}