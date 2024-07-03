import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          '<Azure_Functions_URL>/api/GetQuestions'
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      <h2>Quiz Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h3>{question.questionText}</h3>
            <ul>
              {question.options.map((option) => (
                <li key={option.id}>{option.optionText}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
