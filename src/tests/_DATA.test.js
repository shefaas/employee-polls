import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

describe("_saveQuestion()", () => {
  it("Test that _saveQuestion() will return question object with correct data", async () => {
    const question = {
      author: "someUsername",
      optionOneText: "1",
      optionTwoText: "2",
    };
    const res = await _saveQuestion(question);
    expect(res.author).toEqual("someUsername");
    expect(res.optionOne.text).toEqual("1");
    expect(res.optionTwo.text).toEqual("2");
  });

  it("Test that _saveQuestion() will throw an error if author is null", async () => {
    const question = {
      author: null,
      optionOneText: "1",
      optionTwoText: "2",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("Test that _saveQuestion() will throw an error if option one's text is missing", async () => {
    const question = {
      author: "someUsername",
      optionTwoText: "2",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("Test that _saveQuestion() will throw an error if option two's text is missing", async () => {
    const question = {
      author: "someUsername",
      optionOneText: "1",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });

  it("Test that _saveQuestion() will throw an error if a parameter name is wrong", async () => {
    const question = {
      author: "someUsername",
      option1Text: "1",
      optionTwoText: "1",
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer()", () => {
  it("Test that _saveQuestionAnswer() will return question object with correct data", async () => {
    const answerData = {
      authedUser: "sarahedo",
      qid: "xj352vofupe1dqz9emx13r",
      answer: "optionOne",
    };
    await expect(_saveQuestionAnswer(answerData)).resolves.toEqual(true);
  });

  it("Test that _saveQuestionAnswer() will throw an error if answer is null", async () => {
    const answerData = {
      authedUser: "someUsername",
      qid: "xj352vofupe1dqz9emx13r",
      answer: null,
    };
    await expect(_saveQuestionAnswer(answerData)).rejects.toEqual(
      "Please provide authedUser, qid, and answer"
    );
  });
});
