@regression @contact-us

Feature: WebdriverUniversity.com - Contact Us Page

    Background: Pre conditions
        Given I navigate to WebdriverUniversity homepage
        When I click on the Contact Us Page
        And I switch to the new browser tab

    Scenario: Valid Contact Us Form Submission
        And I type a first name
        And I type a last name
        And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario: Invalid Contact Us Form Submission
        And I type a first name
        And I type a last name
        #And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a unsuccessful contact us submission message

    Scenario: Valid Contact Us Form Submission - Using Specific Data
        And I type a specific first name "Sarah"
        And I type a specific last name "Woods"
        And I enter a specific email address "sarah_woods@example.com"
        And I type a specific comment "Hello World" and a number 2 within the comment input field
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    Scenario: Contact Us Form Submission - Using Random Data
        And I type a random first name
        And I type a randomlast name
        And I enter a random email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a successful contact us submission message

    @smoke
    Scenario Outline: Valid Contact Us Form Submission - List
        And I type a first name <firstName> and a last name <lastName>
        And I type an email address '<emailAddress>' and a comment '<comment>'
        And I click on the submit button
        Then I should be presented with a header message '<message>'

        Examples:
            | firstName | lastName | emailAddress     | comment           | message                     |
            | Janet     | Kong     | janetKong@GG.com | Hello World       | Thank You for your Message! |
            | Mai       | Smith    | mai_Smith@GG.com | Test 123 Test 123 | Thank You for your Message! |
            | Grace     | Lundg    | graceL123        | Website ????!!!   | Invalid email address       |